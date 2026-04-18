import * as runtime from 'react/jsx-runtime'
import { mdxComponents } from './MDXComponents'

// Velite emits pre-compiled MDX as a function-body string. It is authored
// content from this repo, processed at build time — never user input.
export function MDXRender({ code }: { code: string }) {
  const factory = new Function(code) as (scope: typeof runtime) => {
    default: React.FC<{ components?: Record<string, React.ComponentType<Record<string, unknown>>> }>
  }
  const { default: Content } = factory({ ...runtime })
  return <Content components={mdxComponents} />
}
