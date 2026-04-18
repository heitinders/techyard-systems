// JSON-LD <script> wrapper. The payload is build-time content from our own
// velite collections; we escape `<` → `\u003c` as a belt-and-braces guard
// against any `</script>` sequence if content ever contains raw HTML.
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
