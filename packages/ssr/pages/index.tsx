import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Mapbul">
      <h1>Mapbul 👋</h1>
      <p>
        <Link href="/about">
          <a>О компании</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
