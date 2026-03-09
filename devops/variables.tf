# CloudFlare
# ==========

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for the domain"
  default     = "1fca363c3a851b4e6b0ebb42d9ab0f5d"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "domain" {
  description = "The custom domain"
  default     = "codename.cl"
}

variable "subdomain" {
  description = "Subdomain for the Cloudflare record"
  default     = "branding"
}
