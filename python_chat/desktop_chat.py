import threading
import tkinter as tk
from tkinter import filedialog, messagebox
from typing import Any, Dict, List, Optional

import requests


API_BASE = "http://localhost:8000"
POLL_MS = 3000


def phone_key(raw: Any) -> str:
    digits = "".join(ch for ch in str(raw or "") if ch.isdigit())
    if digits.startswith("521") and len(digits) == 13:
        return digits[3:]
    if digits.startswith("52") and len(digits) == 12:
        return digits[2:]
    return digits


def normalize_ts(value: Any) -> int:
    try:
        n = int(float(value or 0))
    except Exception:
        return 0
    if n <= 0:
        return 0
    return n * 1000 if n < 1_000_000_000_000 else n


class DesktopChatApp:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Python Chat Desktop")
        self.root.geometry("1200x760")
        self.root.configure(bg="#f1f5f9")

        self.conversations: List[Dict[str, Any]] = []
        self.selected_phone: Optional[str] = None
        self.selected_name: str = ""

        self._build_ui()
        self._refresh_loop()

    def _build_ui(self) -> None:
        container = tk.Frame(self.root, bg="#f1f5f9")
        container.pack(fill="both", expand=True, padx=10, pady=10)

        left = tk.Frame(container, bg="white", bd=0)
        left.pack(side="left", fill="y", padx=(0, 8))

        tk.Label(left, text="Conversaciones", bg="white", fg="#0f172a", font=("Segoe UI", 11, "bold")).pack(anchor="w", padx=10, pady=(10, 6))

        self.search_var = tk.StringVar()
        search = tk.Entry(left, textvariable=self.search_var, width=32)
        search.pack(padx=10, pady=(0, 8))
        search.bind("<KeyRelease>", lambda _e: self._render_conversations())

        self.listbox = tk.Listbox(left, width=40, height=35, activestyle="none")
        self.listbox.pack(padx=10, pady=(0, 10), fill="y", expand=True)
        self.listbox.bind("<<ListboxSelect>>", self._on_select_conversation)

        right = tk.Frame(container, bg="white")
        right.pack(side="left", fill="both", expand=True)

        head = tk.Frame(right, bg="#e2e8f0")
        head.pack(fill="x")
        self.title_var = tk.StringVar(value="Selecciona una conversacion")
        self.subtitle_var = tk.StringVar(value="")
        tk.Label(head, textvariable=self.title_var, bg="#e2e8f0", fg="#0f172a", font=("Segoe UI", 12, "bold")).pack(anchor="w", padx=12, pady=(8, 2))
        tk.Label(head, textvariable=self.subtitle_var, bg="#e2e8f0", fg="#475569", font=("Segoe UI", 9)).pack(anchor="w", padx=12, pady=(0, 8))

        body = tk.Frame(right, bg="white")
        body.pack(fill="both", expand=True)

        self.text = tk.Text(body, wrap="word", bg="#ffffff", fg="#0f172a", state="disabled", font=("Consolas", 10))
        self.text.pack(fill="both", expand=True, padx=10, pady=10)

        footer = tk.Frame(right, bg="#f8fafc")
        footer.pack(fill="x")

        self.input_var = tk.StringVar()
        entry = tk.Entry(footer, textvariable=self.input_var)
        entry.pack(side="left", fill="x", expand=True, padx=(10, 6), pady=10)
        entry.bind("<Return>", lambda _e: self.send_message())

        tk.Button(footer, text="Adjuntar archivo", command=self.attach_local_file).pack(side="left", padx=(0, 6), pady=10)
        tk.Button(footer, text="Enviar", command=self.send_message, bg="#0f766e", fg="white").pack(side="left", padx=(0, 10), pady=10)

    def _run_threaded(self, fn):
        threading.Thread(target=fn, daemon=True).start()

    def _refresh_loop(self) -> None:
        self._run_threaded(self.load_conversations)
        if self.selected_phone:
            self._run_threaded(self.load_messages)
        self.root.after(POLL_MS, self._refresh_loop)

    def api_get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        resp = requests.get(f"{API_BASE}{path}", params=params or {}, timeout=15)
        resp.raise_for_status()
        return resp.json()

    def api_post(self, path: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        resp = requests.post(f"{API_BASE}{path}", json=payload, timeout=20)
        resp.raise_for_status()
        return resp.json()

    def load_conversations(self) -> None:
        try:
            data = self.api_get("/wa/conversations", {"limit": 200})
            rows = data.get("conversations") if isinstance(data, dict) else []
            rows = rows if isinstance(rows, list) else []
            rows.sort(key=lambda x: int(x.get("lastTimestamp") or 0), reverse=True)
            self.conversations = rows
            self.root.after(0, self._render_conversations)
        except Exception as exc:
            self.root.after(0, lambda: self.subtitle_var.set(f"Error conversaciones: {exc}"))

    def _render_conversations(self) -> None:
        needle = self.search_var.get().strip().lower()
        self.listbox.delete(0, tk.END)

        for c in self.conversations:
            name = str(c.get("name") or "").strip()
            phone = str(c.get("phone") or "").strip()
            last_text = str(c.get("lastText") or "").strip()
            label = f"{name or ('+' + phone)}  |  {last_text[:50]}"
            hay = f"{name} {phone} {last_text}".lower()
            if needle and needle not in hay:
                continue
            self.listbox.insert(tk.END, label)

    def _find_conversation_by_index(self, index: int) -> Optional[Dict[str, Any]]:
        needle = self.search_var.get().strip().lower()
        filtered = []
        for c in self.conversations:
            name = str(c.get("name") or "").strip()
            phone = str(c.get("phone") or "").strip()
            last_text = str(c.get("lastText") or "").strip()
            hay = f"{name} {phone} {last_text}".lower()
            if needle and needle not in hay:
                continue
            filtered.append(c)
        if index < 0 or index >= len(filtered):
            return None
        return filtered[index]

    def _on_select_conversation(self, _ev=None) -> None:
        try:
            idx = int(self.listbox.curselection()[0])
        except Exception:
            return
        conv = self._find_conversation_by_index(idx)
        if not conv:
            return

        self.selected_phone = str(conv.get("phone") or "").strip()
        self.selected_name = str(conv.get("name") or "").strip()
        self.title_var.set(self.selected_name or f"+{self.selected_phone}")
        self.subtitle_var.set(f"Telefono: +{self.selected_phone}")

        self._run_threaded(self.mark_read)
        self._run_threaded(self.load_messages)

    def mark_read(self) -> None:
        if not self.selected_phone:
            return
        try:
            self.api_post("/wa/mark-read", {"phone": self.selected_phone})
        except Exception:
            pass

    def load_messages(self) -> None:
        if not self.selected_phone:
            return
        try:
            data = self.api_get("/wa/conversation", {"phone": self.selected_phone, "limit": 300})
            messages = data.get("messages") if isinstance(data, dict) else []
            messages = messages if isinstance(messages, list) else []

            seen = set()
            clean = []
            for m in messages:
                msg_id = str(m.get("id") or m.get("messageId") or m.get("waId") or "").strip()
                key = msg_id or f"{m.get('direction')}|{normalize_ts(m.get('timestamp'))}|{str(m.get('text') or '')[:100]}"
                if key in seen:
                    continue
                seen.add(key)
                clean.append(m)

            clean.sort(key=lambda x: normalize_ts(x.get("timestamp") or x.get("createdAt") or x.get("sentAt")))
            self.root.after(0, lambda: self.render_messages(clean))
        except Exception as exc:
            self.root.after(0, lambda: self.subtitle_var.set(f"Error mensajes: {exc}"))

    def render_messages(self, messages: List[Dict[str, Any]]) -> None:
        self.text.configure(state="normal")
        self.text.delete("1.0", tk.END)

        for m in messages:
            direction = str(m.get("direction") or "in").strip().lower()
            sender = "Tu" if direction == "out" else (self.selected_name or f"+{self.selected_phone}")
            text = str(m.get("text") or m.get("caption") or "").strip() or "[sin texto]"
            ts = normalize_ts(m.get("timestamp") or m.get("createdAt") or m.get("sentAt"))
            line = f"[{sender}] {text}"
            if ts:
                from datetime import datetime

                line += f"   ({datetime.fromtimestamp(ts / 1000).strftime('%d/%m %H:%M')})"
            self.text.insert(tk.END, line + "\n")

        self.text.see(tk.END)
        self.text.configure(state="disabled")

    def send_message(self) -> None:
        if not self.selected_phone:
            messagebox.showwarning("Chat", "Selecciona una conversacion primero")
            return
        msg = self.input_var.get().strip()
        if not msg:
            return

        def task() -> None:
            try:
                self.api_post("/send-whatsapp", {"to": self.selected_phone, "message": msg})
                self.root.after(0, lambda: self.input_var.set(""))
                self.load_messages()
                self.load_conversations()
            except Exception as exc:
                self.root.after(0, lambda: messagebox.showerror("Error envio", str(exc)))

        self._run_threaded(task)

    def attach_local_file(self) -> None:
        if not self.selected_phone:
            messagebox.showwarning("Chat", "Selecciona una conversacion primero")
            return
        path = filedialog.askopenfilename(title="Selecciona archivo local")
        if not path:
            return

        # This desktop client sends a text marker with local path reference.
        # You can later extend /send-whatsapp to media upload endpoints.
        note = f"[Archivo local] {path}"

        def task() -> None:
            try:
                self.api_post("/send-whatsapp", {"to": self.selected_phone, "message": note})
                self.load_messages()
                self.load_conversations()
            except Exception as exc:
                self.root.after(0, lambda: messagebox.showerror("Error archivo", str(exc)))

        self._run_threaded(task)


def main() -> None:
    root = tk.Tk()
    app = DesktopChatApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
