import EditProfile from '../Components/EditProfile'
import { useSelector } from 'react-redux'
import TinderCard from '../Components/TinderCard'


const Profile = () => {
  const user = useSelector((store) => store.user)

  if (!user) return null

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      
      <div className="flex w-full max-w-7xl gap-12">
        
        {/* LEFT - FORM */}
        <div className="flex-1">
          <EditProfile user={user} />
        </div>
        {/* RIGHT - PREVIEW */}
        <div className="flex-1 flex items-center justify-center">
          <TinderCard user={user} />
        </div>

      </div>
    </div>
  )
}

export default Profile;