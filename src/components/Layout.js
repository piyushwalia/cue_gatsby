import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress" />
    <Navbar />
    <div className="pt-44">{children}</div>
  </div>
)

export default TemplateWrapper
