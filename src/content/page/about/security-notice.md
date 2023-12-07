---
title: Security Notice
description: How to report a security vulnerability in one of our projects.
layout: /src/layouts/Page.astro
---

This is the security notice for all QuiltMC repositories. The notice explains how security vulnerabilities should be reported. We also support the [security.txt](/.well-known/security.txt) standard.

# Reporting a Vulnerability

If you've found a vulnerability, please let us know privately so that we can fix it before it is released publicly. **Do not open a GitHub issue to report a security vulnerability.**

Send details to [admins@quiltmc.org](mailto:admins@quiltmc.org), including:

* The website, page, tool or repository where the vulnerability can be observed
* A brief description of the vulnerability
* Optionally the type of vulnerability and any related [OWASP category](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_2017_Project)
* Non-destructive exploitation details and proof of concept

We will do our best to reply as fast as possible. [A PGP key is available](/.gpg/administrative-board.gpg) if you'd like to encrypt the email.

## Scope
The following vulnerabilities are not in scope:

* Volumetric vulnerabilities, for example overwhelming a service with a high volume of requests
* Reports indicating that our services do not fully align with “best practice”, for example missing security headers

If you aren't sure whether a vulnerability is in scope or not, you can still reach out via email.

This notice is inspired by the [GDS Security Notice](https://github.com/alphagov/.github/blob/master/SECURITY.md).
