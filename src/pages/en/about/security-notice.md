---
title: Security Notice
description: If you find a vulnerability in one of our project, please report it using the procedure detailed here
layout: /src/layouts/Page.astro
---

This is the security notice for all QuiltMC repositories. The notice explains how vulnerabilities should be reported. We also support the [security.txt](/.well-known/security.txt) standard.

# Reporting a Vulnerability

If you've found a vulnerability, we would like to know so we can fix it before it is released publicly. **Do not open a GitHub issue for a found vulnerability.**

Send details to [admins@quiltmc.org](mailto:admins@quiltmc.org), including:

* The website, page, tool or repository where the vulnerability can be observed
* A brief description of the vulnerability
* Optionally the type of vulnerability and any related [OWASP category](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_2017_Project)
* Non-destructive exploitation details and proof of concept

We will do our best to reply as fast as possible. [A PGP key is also available](/.gpg/administrative-board.gpg) to encrypt the communication.

# Scope
The following vulnerabilities are not in scope:

* Volumetric vulnerabilities, for example overwhelming a service with a high volume of requests
* Reports indicating that our services do not fully align with “best practice”, for example missing security headers

If you aren't sure, you can still reach out via email.

This notice is inspired by the [GDS Security Notice](https://github.com/alphagov/.github/blob/master/SECURITY.md).
