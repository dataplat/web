{{- /*
    MARKDOWN MIRROR OF A REGULAR PAGE  ->  /<page>/index.md

    Fallback for posts and standalone pages. Command pages use the cleaner
    layouts/commands/single.md instead.
*/ -}}
---
title: "{{ .Title }}"
{{ with or .Description .Params.synopsis }}description: "{{ . }}"
{{ end }}url: "{{ .Permalink }}"
{{ with .Params.tags }}tags: [{{ range $i, $t := . }}{{ if $i }}, {{ end }}"{{ $t }}"{{ end }}]
{{ end }}last_updated: "{{ .Lastmod.Format "2006-01-02" }}"
---

# {{ .Title }}

{{ trim .RawContent "\n " }}
