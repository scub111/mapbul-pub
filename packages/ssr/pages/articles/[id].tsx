import * as React from 'react'
import { NextPageContext } from 'next'
import { sampleFetchWrapper } from '../../utils/sample-api'
import { IArticleDTO } from "@mapbul-pub/types"
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'

type Props = {
  item?: IArticleDTO
  errors?: string
}

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query
      const item = await sampleFetchWrapper(
        // `http://localhost:3100/api/editors/${Array.isArray(id) ? id[0] : id}`
        `articles/${Array.isArray(id) ? id[0] : id}`
        // `http://api.tvmaze.com/shows/${Array.isArray(id) ? id[0] : id}`
        // `http://api.mapbul.scub111.com/api/editors/${Array.isArray(id) ? id[0] : id}`
      )
      return { item }
    } catch (err) {
      return { errors: err.message }
    }
  }

  render() {
    const { item, errors } = this.props

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      )
    }

    return (
      <Layout
        title={`${
          item ? item : 'User Detail'
        } | Next.js + TypeScript Example`}
      >
        {item && <ListDetail item={item} />}
      </Layout>
    )
  }
}

export default InitialPropsDetail
