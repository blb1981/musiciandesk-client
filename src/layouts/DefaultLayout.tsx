import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div>
      <div>DefaultLayout</div>
      <Outlet />
    </div>
  )
}
export default DefaultLayout
