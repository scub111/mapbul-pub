import { NextPage } from 'next'
import Link from 'next/link'

import Layout from '../../components/Layout'
import List from '../../components/List'
import { sampleFetchWrapper } from '../../utils/sample-api'
import { Pagination, IArticleDTO } from "@mapbul-pub/types"

type Props = {
  pagination: Pagination<IArticleDTO>
  pathname: string
}

const WithInitialProps: NextPage<Props> = ({ pagination, pathname }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Editors List</h1>
    <p>
      Example fetching data from inside <code>getInitialProps()</code>.
    </p>
    <p>You are currently on: {pathname}</p>
    <List items={pagination.data} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

WithInitialProps.getInitialProps = async ({ pathname }) => {
  // Example for including initial props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper(
    // 'http://localhost:3000/api/users'
    'articles'
    // 'http://api.tvmaze.com/shows'
    // 'http://api.tvmaze.com/search/shows?q=batman'
    // 'http://api.mapbul.scub111.com/api/editors'
  )

  return { pagination, pathname }
}

export default WithInitialProps
