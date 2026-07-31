{{- /*
    MARKDOWN MIRROR OF THE COMMAND INDEX  ->  /commands/index.md

    content/page/cmd.md has no body, so the default markdown mirror would be an
    empty stub. The useful markdown form of this page is the index itself: every
    command, its synopsis, its platform and a link to its own markdown page.
*/ -}}
{{- $commands := slice -}}
{{- with (os.ReadFile "static/commands.json") -}}
  {{- $commands = . | transform.Unmarshal -}}
{{- end -}}
{{- $categoryNames := slice -}}
{{- range $commands }}{{ $categoryNames = $categoryNames | append .category }}{{ end -}}
{{- $categories := $categoryNames | uniq | sort -}}
---
title: "dbatools command index"
description: "All {{ len $commands }} dbatools commands with synopsis, category and platform."
url: "{{ .Permalink }}"
last_updated: "{{ .Lastmod.Format "2006-01-02" }}"
---

# dbatools command index

{{ len $commands }} commands, grouped by category. Each links to a markdown reference page with syntax, worked examples and a full parameter table.

Platform is derived from the dbatools module source, not from the `Availability`
field in dbatools-index.json — that field reports every command as
cross-platform and carries no information. Commands marked Windows-only depend
on the registry, WMI, or SMO on .NET Framework.
{{ range $category := $categories }}
## {{ $category }}
{{ range (sort (where $commands "category" $category) "name") }}
- **[{{ .name }}]({{ absURL .url }}/index.md)**{{ if .windowsOnly }} *(Windows only)*{{ end }} — {{ .synopsis | replaceRE `\s+` " " }}
{{- end }}
{{ end }}
