export default function(BrowserPolicy) {
    BrowserPolicy.content.allowOriginForAll("https://*.googleapis.com");
    BrowserPolicy.content.allowOriginForAll("https://*.gstatic.com");
    BrowserPolicy.content.allowOriginForAll("https://*.bootstrapcdn.com");
    BrowserPolicy.content.allowFontDataUrl();
}
