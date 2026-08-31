import { PagePlaceholder } from '@/components/layout/PagePlaceholder'

export function NotFoundPage() {
  return (
    <PagePlaceholder
      kicker="404"
      title="This path does not exist"
      description="The route is unknown. Return home, or use the navigation to continue."
    />
  )
}