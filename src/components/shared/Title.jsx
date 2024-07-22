import { Helmet } from 'react-helmet-async'

const Title = ({
    title = 'Data Streaming App',
    description = 'Welcome to the DataStream App!',
}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title