import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { pink400 } from 'material-ui/styles/colors';



class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    let { onLoginClick, onCreateLoginClick, login } = this.props;
    if (login && login.masterKey) {
      onLoginClick(this._tf.getValue())
    } else {
      onCreateLoginClick(this._tf.getValue())
    }
  }

  render() {
    let { onLoginClick, onCreateLoginClick, login={}} = this.props;
    let { masterKey, local } = login;

    return (
      <div style={styles.root}>
        <TextField ref={(ref) => this._tf = ref}
          style={styles.field}
          hintText="Master key"
          errorText={local && local.error}
          floatingLabelText="Master key"
          type="password" fullWidth={true}
        />
        <br/>
        <br/>
        <RaisedButton style={styles.field}
          onTouchTap={this.handleLoginClick}
          label={ masterKey ? 'Login' : 'Add master key to start'}
          primary fullWidth={true}
          />
      </div>
    )
  }
}



const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    maxWidth: '400px',
    minWidth: 'auto',
    width: '80%'
  }
}
export default Login
