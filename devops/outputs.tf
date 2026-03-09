output "cname_record" {
  value = "${var.subdomain}.${var.domain}"
}

output "cname_target" {
  value = cloudflare_record.github_pages_cname.content
}
