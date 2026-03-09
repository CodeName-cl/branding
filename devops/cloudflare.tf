# CNAME record pointing branding.codename.cl to GitHub Pages

resource "cloudflare_record" "github_pages_cname" {
  zone_id = var.cloudflare_zone_id
  name    = var.subdomain
  type    = "CNAME"
  content = "codename-cl.github.io"
  proxied = false
}
