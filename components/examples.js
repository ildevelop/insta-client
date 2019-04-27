import { connect } from 'react-redux'
import Clock from './clock'
import Link from 'next/link'
import {serverRenderClock, startClock} from "../actions/mainActions";
import React from "react";
// import myPict from '../static/img/ryan.jpg'
import "./styles.scss"
// function MyImage() {
//   return <img src="../static/img/ryan.jpg" alt="my image" />;
// }
class Examples extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }
  componentDidMount () {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => this.props.startClock(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render(){
    const {lastUpdate,light}= this.props
    return (
      <div>
        <h2 className="example">Hello Examples</h2>
        <img src="../static/img/ryan.jpg" alt="my image" />
        <ul>
          <li>
            <Link prefetch href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a title="About page">About</a>
            </Link>
          </li>
        </ul>
        <Clock lastUpdate={lastUpdate} light={light} />
      </div>
    )
  }

}

function mapStateToProps (state) {
  const { lastUpdate, light } = state.userReducer
  return { lastUpdate, light }
}
const mapDispatchToProps = { startClock }


export default connect(mapStateToProps,mapDispatchToProps)(Examples)