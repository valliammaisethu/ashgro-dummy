(function () {
  const script = document.currentScript;
  const clubId = script?.getAttribute("data-club-id") || "";
  const host = window.location.hostname || "";

  if (!clubId || !host) return;

  const BASE = "https://complete-azure-macaw.ashgro.revolte.io/chatbot";

  const BASE_API_URL = `https://useful-lime-landfowl.ashgro.revolte.io/api/v1/chatbot/${clubId}`;

  const IFRAME_URL = `${BASE}/?clubId=${encodeURIComponent(
    clubId
  )}&host=${encodeURIComponent(host)}`;

  async function checkIsValidHost(url, attempt = 1, maxRetries = 3) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) throw new Error("Invalid");

      const data = await res.json();

      return data;
    } catch {
      clearTimeout(timeout);

      if (attempt >= maxRetries) return null;

      await new Promise((r) => setTimeout(r, 100 * Math.pow(3, attempt - 1)));
      return checkIsValidHost(url, attempt + 1, maxRetries);
    }
  }

  (async () => {
    const data = await checkIsValidHost(BASE_API_URL);

    if (data?.success) initializeChatbot();
  })();

  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = BASE;
  document.head.appendChild(preconnect);

  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "document";
  preload.href = IFRAME_URL;
  document.head.appendChild(preload);

  function initializeChatbot() {
    let iframe = null;
    let isOpen = false;

    function isMobileDevice() {
      return (
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (window.visualViewport?.width || window.innerWidth) <= 600
      );
    }

    const create = (tag, style, html) => {
      const el = document.createElement(tag);
      Object.assign(el.style, style);
      if (html) el.innerHTML = html;
      return el;
    };

    let isMobile = isMobileDevice();

    const getIframeStyle = () => {
      return isMobileDevice()
        ? {
            position: "fixed",
            bottom: "0",
            right: "0",
            width: "100%",
            height: "100%",
            border: "none",
            display: "none",
            zIndex: 999999991,
            transition: "opacity 0.25s, transform 0.25s",
            opacity: "0",
            transform: "translateY(20px)"
          }
        : {
            position: "fixed",
            bottom: "12px",
            right: "12px",
            width: "480px",
            height: "499px",
            borderRadius: "32px",
            border: "none",
            background: "white",
            display: "none",
            zIndex: 999999991,
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            transition: "opacity 0.25s, transform 0.25s",
            opacity: "0",
            transform: "translateY(20px)"
          };
    };

    const launcher = create(
      "div",
      {
        position: "fixed",
        bottom: "12px",
        right: "12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 999999999
      },
      `
        <div style="
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
      ${isMobile ? "transform: none;" : "transform: translateY(10px);"}
          z-index:999999997;
        ">
          <video 
             src="https://constitutional-violet-swift.rootquotient.revolte.io/assets/profile.mp4"
            autoplay muted loop playsinline
            style="width: 100%; height: 100%; object-fit: cover;"
          ></video>
        </div>

        <div style="
          background: #0F131C;
          color: white;
          padding: 19px;
          border-radius: 48px;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          font-family: 'Reddit Sans', sans-serif;
          z-index:999999999;
        ">
          Explore with Your Concierge
        </div>
      `
    );
    launcher.id = "rqt-chatbot-launcher";

    document.body.appendChild(launcher);

    const showIframe = () => {
      if (!iframe) {
        iframe = create("iframe", getIframeStyle());
        iframe.id = "rqt-chatbot-iframe";
        iframe.src = IFRAME_URL;
        document.body.appendChild(iframe);
      }

      launcher.style.display = "none";
      iframe.style.display = "block";
      requestAnimationFrame(() => {
        iframe.style.opacity = "1";
        iframe.style.transform = "translateY(0)";
      });
    };

    const hideIframe = () => {
      if (!iframe) return;

      iframe.style.opacity = "0";
      iframe.style.transform = "translateY(20px)";
      setTimeout(() => {
        iframe.remove();
        iframe = null;
        launcher.style.display = "flex";
      }, 250);
    };

    launcher.onclick = () => {
      isOpen ? hideIframe() : showIframe();
      isOpen = !isOpen;
    };

    window.addEventListener("message", (e) => {
      if (!iframe) return;
      if (e.data?.type === "CLOSE_CHATBOT") {
        isOpen = false;
        hideIframe();
      }
      if (e.data?.type === "EXPAND_MAX") iframe.style.height = "97vh";
    });
  }
})();
