/** Links http/https abrem em nova aba com segurança; rotas internas ficam na mesma aba. */
export function linkTargetProps(href: string): { target?: "_blank"; rel?: string } {
  return /^https?:\/\//i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {}
}
