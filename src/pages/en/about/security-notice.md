---
title: Security Notice
description: How to report a security vulnerability in a Quilt project.
layout: /src/layouts/Page.astro
---

This notice details how to report any security vulnerabilities you find in a QuiltMC project. Please **do not** use GitHub issues or other public spaces (Discord, etc.) to report security vulnerabilities.

## What to include
When submitting your report, please include the following:
- Details about where the vulnerability can be found.
- A brief description of the vulnerability.
- Steps to reproduce the vulnerability.
- Screenshots, recordings or logs showing the vulnerability being exploited, if possible.

## Reporting via GitHub
The preferred way to report a vulnerability is to submit a [Private Vulnerability Report](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) on GitHub. These are private GitHub issues which are only accessible to repository maintainers.

To submit a private vulnerability report, go to the relevant repository, click the **Security** tab, click **Report a vulnerability** and fill out the form. Please give as much detail as you can, including the type of vulnerability and detailed reproduction steps. After you submit the report, you can optionally create a private fork of the repository in question, which you can use to submit a patch for the vulnerability you're reporting.

## Reporting via email
Alternatively, you can submit your report by emailing [admins@quiltmc.org](mailto:admins@quiltmc.org). If you would like to encrypt your email, you can use [this GPG key](/.gpg/administrative-board.gpg).

This notice was partially inspired by the UK's [GDS security notice](https://github.com/alphagov/.github/blob/main/SECURITY.md)
