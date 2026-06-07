#!/usr/bin/env python3
"""Read password from stdin; set WEBSITE_ADMIN_PASSWORD= in .env (quoted). Used by deploy.sh."""
import re
import sys

def main() -> None:
    pw = sys.stdin.read().rstrip("\r\n")
    path = ".env"
    with open(path, encoding="utf-8") as f:
        c = f.read()
    escaped = '"' + pw.replace("\\", "\\\\").replace('"', '\\"') + '"'
    line = "WEBSITE_ADMIN_PASSWORD=" + escaped
    if re.search(r"^WEBSITE_ADMIN_PASSWORD=", c, re.M):
        c = re.sub(r"^WEBSITE_ADMIN_PASSWORD=.*$", line, c, flags=re.M)
    else:
        c = c.rstrip() + "\n" + line + "\n"
    with open(path, "w", encoding="utf-8") as f:
        f.write(c)


if __name__ == "__main__":
    main()
