import { Link } from 'react-router-dom'
import { HeaderContainer } from './Header.module'

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'post'}>Post</Link></li>
        </ul>
      </nav>
    </HeaderContainer>
  )
}

export default Header