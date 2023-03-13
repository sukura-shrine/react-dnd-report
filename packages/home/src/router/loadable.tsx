import React, { Suspense, lazy } from 'react'

const Loading = () => {
  return <div>loading...</div>
}

export default (path: string) => {
  // const Component = React.lazy(() => import(`../containers${path}/index`))
  const Component = React.lazy(() => import(`../containers/app/index`))
  return (
    <Suspense fallback={<Loading/>}>
      <Component />
    </Suspense>
  )
}