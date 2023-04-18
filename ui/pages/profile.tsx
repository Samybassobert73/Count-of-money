// pages/profile.js

const Profile = () => {
  return (
    <div>
      <h1>Your Profile</h1>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      userTypes: ['admin']
    },
  }
}

export default Profile
