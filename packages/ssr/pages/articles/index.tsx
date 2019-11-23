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
  <Layout title="Mapbul. Главная">
    <h1>Articles List</h1>
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
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper('articles');
  return { pagination, pathname }
}

export default WithInitialProps
