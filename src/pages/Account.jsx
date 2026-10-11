import {
  User,
  ChevronRight,
  Wallet,
  ShoppingBag,
  Package,
} from 'lucide-react'
import { items } from '../data/items'
import BalancePanel from "../components/BalancePanel";

export default function Account() {
  return (
    <main className="account-page">
      <div className="account-container">
        <h1 className="account-title">My Account</h1>
        <div className="account-columns">


          <aside className="account-left">
            {/* PROFILE */}
            <div className="account-box profile-box">
              <div className="profile-picture">
                <User size={32} />
              </div>

              <div className="profile-info">
                <h2>Lile Nozadze</h2>
                <p>Country</p>
              </div>
            </div>

            
            <div className="member-since"> 
                <span>Member since</span> 
                <strong>October 2026</strong> 
            </div>
            <div className="account-box personal-info">
              <h2 className="account-box-title">
                Personal information
              </h2>
              <div className="personal-item">
                <div>
                  <span>Name</span>
                  <strong>Lile Nozadze</strong>
                </div>
              </div>

              <div className="personal-item">
                <div>
                  <span>Email</span>
                  <strong>lile@example.com</strong>
                </div>
              </div>

              <div className="personal-item">
                <div>
                  <span>Phone number</span>
                  <strong>+34 600 000 000</strong>
                </div>
              </div>

              <div className="personal-item">
                <div>
                  <span>Region</span>
                  <strong>Spain</strong>
                </div>
              </div> 

            <div className="account-links">
                <button>
                  <div>
                    <span>Edit Profile</span>
                  </div>
                  <ChevronRight size={19} />
                </button>

                <button>
                  <div>
                    <span>Payments</span>
                  </div>
                  <ChevronRight size={19} />
                </button>

                <button>
                  <div>
                    <span>Password</span>
                  </div>
                  <ChevronRight size={19} />
                </button>

                <button>
                  <div>
                    <span>Settings</span>
                  </div>
                  <ChevronRight size={19} />
                </button>
                </div>
              </div>

          </aside>


          <section className="account-right">
            
            {/* TRANSACTIONS */}

            <div className="account-box">

              <BalancePanel />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}