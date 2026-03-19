import argparse
import os
import time
from pathlib import Path

import requests
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def _get_env(name: str, default: str = "") -> str:
	return str(os.getenv(name, default) or "").strip()


def wait_callback_ready(callback_url: str, verify_token: str, timeout_sec: int = 45) -> bool:
	start = time.time()
	challenge = "12345"
	url = (
		f"{callback_url}?hub.mode=subscribe"
		f"&hub.verify_token={verify_token}&hub.challenge={challenge}"
	)
	while time.time() - start < timeout_sec:
		try:
			resp = requests.get(url, timeout=8)
			body = (resp.text or "").strip()
			if resp.status_code == 200 and body == challenge:
				print("[AutoWebhook] Callback accesible y verificado.")
				return True
		except Exception:
			pass
		time.sleep(2)

	print("[AutoWebhook] Callback no accesible aun (timeout).")
	return False


def configure_app_subscription(callback_url: str, verify_token: str) -> bool:
	app_id = _get_env("META_APP_ID")
	app_access_token = _get_env("META_APP_ACCESS_TOKEN")
	fields = _get_env(
		"META_WEBHOOK_FIELDS",
		"messages,message_template_status_update,message_template_quality_update",
	)

	if not app_id or not app_access_token:
		print("[AutoWebhook] META_APP_ID/META_APP_ACCESS_TOKEN no definidos. Se omite auto-configuracion de suscripcion app.")
		return False

	url = f"https://graph.facebook.com/v20.0/{app_id}/subscriptions"
	payload = {
		"object": "whatsapp_business_account",
		"callback_url": callback_url,
		"verify_token": verify_token,
		"fields": fields,
		"access_token": app_access_token,
	}

	resp = requests.post(url, data=payload, timeout=25)
	if resp.ok:
		print("[AutoWebhook] Suscripcion de app actualizada correctamente.")
		return True

	print(f"[AutoWebhook] Error suscripcion app: {resp.status_code} {resp.text[:400]}")
	return False


def configure_phone_webhook_override(callback_url: str, verify_token: str) -> bool:
	phone_number_id = _get_env("META_PHONE_NUMBER_ID")
	wa_token = _get_env("META_WHATSAPP_TOKEN")
	if not phone_number_id or not wa_token:
		print("[AutoWebhook] META_PHONE_NUMBER_ID/META_WHATSAPP_TOKEN no definidos. Se omite override por numero.")
		return False

	url = f"https://graph.facebook.com/v20.0/{phone_number_id}"
	payload = {
		"webhook_configuration": f'{{"override_callback_uri":"{callback_url}","verify_token":"{verify_token}"}}',
		"access_token": wa_token,
	}
	resp = requests.post(url, data=payload, timeout=25)
	if resp.ok:
		print("[AutoWebhook] Override webhook por numero actualizado.")
		return True

	print(f"[AutoWebhook] Error override por numero: {resp.status_code} {resp.text[:400]}")
	return False


def ensure_waba_subscribed() -> bool:
	waba_id = _get_env("META_WABA_ID")
	app_access_token = _get_env("META_APP_ACCESS_TOKEN")
	if not waba_id or not app_access_token:
		print("[AutoWebhook] META_WABA_ID/META_APP_ACCESS_TOKEN no definidos. Se omite subscribed_apps.")
		return False

	url = f"https://graph.facebook.com/v20.0/{waba_id}/subscribed_apps"
	resp = requests.post(url, data={"access_token": app_access_token}, timeout=25)
	if resp.ok:
		print("[AutoWebhook] WABA subscribed_apps OK.")
		return True

	text = (resp.text or "").lower()
	if "already subscribed" in text:
		print("[AutoWebhook] WABA ya estaba suscrito.")
		return True

	print(f"[AutoWebhook] Error subscribed_apps: {resp.status_code} {resp.text[:400]}")
	return False


def main() -> int:
	parser = argparse.ArgumentParser(description="Auto configuracion webhook WhatsApp Cloud API")
	parser.add_argument("--callback-url", required=True)
	parser.add_argument("--verify-token", required=True)
	args = parser.parse_args()

	callback_url = str(args.callback_url or "").strip().rstrip("/")
	verify_token = str(args.verify_token or "").strip()
	if not callback_url or not verify_token:
		print("[AutoWebhook] callback_url y verify_token son requeridos.")
		return 1

	ready = wait_callback_ready(callback_url, verify_token)
	if not ready:
		# Keep non-blocking behavior for launcher.
		return 0

	configure_phone_webhook_override(callback_url, verify_token)
	configure_app_subscription(callback_url, verify_token)
	ensure_waba_subscribed()
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
