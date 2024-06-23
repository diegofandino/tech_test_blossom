import { ITitle } from '../../../models'

const Title = ({title}:ITitle) => {
  return (
	<h1 className='text-2xl text-left'>{title}</h1>
  )
}

export default Title