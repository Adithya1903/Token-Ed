import dashstyles from '../styles/dashboard.module.css'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import connectDB from '../../../lib/connectDB'
import Users from '../../../lib/userSchema'
import Registration from '../../../components/Register/Registration'
import { useRouter } from 'next/router'
import Users from '../../../../lib/userSchema'
import Students from '../../../../lib/studentSchema'
import Professors from '../../../../lib/professorSchema'
import Opportunities from '../../../../lib/opportunitySchema'

export default function Dashboard(props) {
  const router = useRouter()

  const groups = props.groups
  const professorAccount = props.professorAccount
  const studentAccount = props.studentAccount
  const administratorAccount = props.administratorAccount

  const handleOrganization = (event) => {
    event.preventDefault()
    router.push('/organizations')
  }

  const handleOpportunities = (event) => {
    event.preventDefault()
    router.push('/opportunities')
  }

  const handleCreateOrganization = (event) => {
    event.preventDefault()
    router.push('/createorganization')
  }

  const handleCreateOpportunity = (event) => {
    event.preventDefault()
    router.push('/createopportunity')
  }

  const handleMyProfile = (event) => {
    event.preventDefault()
    router.push('/myprofile')
  }

  const handleMeetTeam = (event) => {
    event.preventDefault()
    router.push('/meetteam')
  }

  const handleAboutUs = (event) => {
    event.preventDefault()
    router.push('/aboutus')
  }
  return (
    <>
      {' '}
      {professorAccount ||
        (administratorAccount === true && (
          <div className={dashstyles.container}>
            <div className={dashstyles.tophalfdash}>
              <header>
                <nav className={dashstyles.navbar}>
                  <a className={dashstyles.anch}>Tokenized Education</a>
                </nav>
              </header>
              <h1 className={dashstyles.welcome}> Welcome User</h1>
              <div className={dashstyles.dashcomponents}>
                <div
                  className={dashstyles.dashorgs}
                  onClick={handleOrganization}
                >
                  <h3 className={dashstyles.comptitle}>Organizations</h3>
                  <div className={dashstyles.orggrid}>
                    {groups.map((group) => (
                      <div className={dashstyles.org}>{group}</div>
                    ))}
                  </div>
                </div>
                <div className={dashstyles.dashstats}>
                  <button
                    className={dashstyles.dashbtn}
                    type="button"
                    onClick={handleMyProfile}
                  >
                    My Profile{' '}
                  </button>
                  <button
                    className={dashstyles.dashbtn}
                    onClick={handleCreateOpportunity}
                  >
                    Create Opportunities
                  </button>
                  <button
                    className={dashstyles.dashbtn}
                    onClick={handleCreateOrganization}
                  >
                    Create Organizations
                  </button>
                </div>
                <div
                  className={dashstyles.dashopps}
                  onClick={handleOpportunities}
                >
                  <h3 className={dashstyles.comptitle}>Opportunities</h3>
                  <div className={dashstyles.oppgrid}>
                    <div className={dashstyles.opp}>OPP 1</div>
                    <div className={dashstyles.opp}>OPP 2</div>
                    <div className={dashstyles.opp}>OPP 3</div>
                    <div className={dashstyles.opp}>OPP 4</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={dashstyles.bottomhalfdash}>
              <div>
                <nav className={dashstyles.bottomnavbar}>
                  <a onClick={handleMeetTeam} style={{ cursor: 'pointer' }}>
                    Meet The Team
                  </a>{' '}
                  <a onClick={handleAboutUs} style={{ cursor: 'pointer' }}>
                    About Us
                  </a>
                </nav>
              </div>
            </div>
          </div>
        ))}
      {studentAccount === true && (
        <div className={dashstyles.container}>
          <div className={dashstyles.tophalfdash}>
            <header>
              <nav className={dashstyles.navbar}>
                <a className={dashstyles.anch}>Tokenized Education</a>
              </nav>
            </header>
            <h1 className={dashstyles.welcome}> Welcome User</h1>
            <div className={dashstyles.dashcomponents}>
              <div className={dashstyles.dashorgs} onClick={handleOrganization}>
                <h3 className={dashstyles.comptitle}>Organizations</h3>
                <div className={dashstyles.orggrid}>
                  <div className={dashstyles.org}>Org 1</div>
                  <div className={dashstyles.org}>Org 2</div>
                  <div className={dashstyles.org}>Org 3</div>
                  <div className={dashstyles.org}>Org 4</div>
                </div>
              </div>
              <div className={dashstyles.dashstats}>
                <button
                  className={dashstyles.dashbtn}
                  type="button"
                  onClick={handleMyProfile}
                >
                  My Profile{' '}
                </button>
                <button
                  className={dashstyles.dashbtn}
                  onClick={handleCreateOpportunity}
                >
                  Create Opportunities
                </button>
              </div>
              <div
                className={dashstyles.dashopps}
                onClick={handleOpportunities}
              >
                <h3 className={dashstyles.comptitle}>Opportunities</h3>
                <div className={dashstyles.oppgrid}>
                  <div className={dashstyles.opp}>OPP 1</div>
                </div>
              </div>
            </div>
          </div>

          <div className={dashstyles.bottomhalfdash}>
            <div>
              <nav className={dashstyles.bottomnavbar}>
                <a onClick={handleMeetTeam} style={{ cursor: 'pointer' }}>
                  Meet The Team
                </a>{' '}
                <a onClick={handleAboutUs} style={{ cursor: 'pointer' }}>
                  About Us
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  await connectDB()
  const user = await Users.findOne({
    accountType: session.user.accountType,
    profileId: session.user.profileId,
  })

  var groups
  var studentAccount
  var administratorAccount
  var professorAccount

  if (user.accountType == 'student') {
    const student = await Students.findOne({ user: user })
    console.log(student)
    groups = student.groups_joined
    studentAccount = true
  }
  if (user.accountType == 'administrator') {
    groups = []
    administratorAccount = true
  }
  if (user.accountType == 'professor') {
    const professor = await Professors.findOne({ user: user })
    groups = professor.groups
    professorAccount = true
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      groups: JSON.parse(JSON.stringify(groups)),
      professorAccount: professorAccount,
      administratorAccount: administratorAccount,
      studentAccount: studentAccount,
    },
  }
}
