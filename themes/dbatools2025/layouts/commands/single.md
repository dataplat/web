{{- /*
    MARKDOWN MIRROR OF A COMMAND PAGE  ->  /<Command>/index.md

    generate-command-pages.ps1 writes bodies that are already mostly markdown —
    fenced powershell blocks, tables, `#####` parameter headings. The HTML in
    them is confined to the header card, the on-this-page nav, and the
    anchor-wrapped h2/h3 headings. This template strips exactly those and
    leaves real markdown.

    If the shape of the generated body changes in generate-command-pages.ps1,
    the three regexes below are what needs updating.
*/ -}}
{{- $body := .RawContent -}}

{{- /* Drop the header card and the on-this-page nav that precede the content */ -}}
{{- $body = replaceRE `(?s)\A.*?<nav class="command-toc">.*?</nav>` "" $body -}}

{{- /* <span id="x" class="section-anchor"></span><h2>..>Title</a></h2> -> ## Title */ -}}
{{- $body = replaceRE `(?s)<span id="[^"]*" class="section-anchor"></span>\s*<h2[^>]*>.*?class="heading-link">([^<]*)</a></h2>` "## $1" $body -}}
{{- $body = replaceRE `(?s)<span id="[^"]*" class="section-anchor"></span>\s*<h3[^>]*>.*?class="heading-link">([^<]*)</a></h3>` "### $1" $body -}}

{{- /* Leftover presentational bits that carry no meaning in markdown */ -}}
{{- $body = replaceRE `&nbsp;` "" $body -}}
{{- $body = replaceRE `<br\s*/?>` "" $body -}}
{{- $body = replaceRE `\n{3,}` "\n\n" $body -}}
{{- $body = trim $body "\n " -}}
---
title: "{{ .Title }}"
description: "{{ .Params.synopsis }}"
url: "{{ .Permalink }}"
availability: "{{ .Params.availability }}"
{{ with .Params.tags }}tags: [{{ range $i, $t := . }}{{ if $i }}, {{ end }}"{{ $t }}"{{ end }}]
{{ end }}{{ with .Params.author }}author: "{{ . }}"
{{ end }}{{ with .Params.sourceUrl }}source: "{{ . }}"
{{ end }}last_updated: "{{ .Lastmod.Format "2006-01-02" }}"
---

# {{ .Title }}

{{ $body }}

---

Part of [dbatools]({{ .Site.BaseURL }}), a free and open source PowerShell module for SQL Server administration. Full command index: {{ absURL "/commands/" }}
