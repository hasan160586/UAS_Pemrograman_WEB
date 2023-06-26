import Link from "next/link"

export default function Home() {
  return (

    <div className="page">
        <div className="navbar">

                
                  <br/>
                    <p>PT TELKOM INDONESIA TBK</p>
              <ul>
                <Link href="/crud"><button>Data Telkom</button></Link>
              </ul>
            </div><br/>
        </div>
  )
}
