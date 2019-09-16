import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';
import TextInput from 'UI/TextInput';
import { Github } from 'grommet-icons';
import Gists from 'gists';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import Button from 'UI/Button';

class GistSync extends PureComponent {
  state = {
    expanded: false,
    inputUsername: '',
    inputPw: '',
    gistList: [],
  };

  gists = null;

  async authToGithub(username, pw) {
    const { loginToGh, loginToGhSuccess, loginToGhFail } = this.props;
    loginToGh(username, pw);
    try {
      this.gists = new Gists({
        username,
        password: pw,
      });
      const gistList = await this.gists.list(username);
      if (gistList) {
        const gists = gistList.body;
        loginToGhSuccess();
        this.setState({ gistList: gists });
      }
    } catch (e) {
      loginToGhFail();
      toast.error('Error logging into Github, please check your credentials');
    }
  }

  async expandGists(expanded) {
    const { githubUserName } = this.props;
    if (expanded && githubUserName) {
      const gistList = await this.gists.list(githubUserName);
      this.setState({
        expanded,
        gistList: gistList.body,
      });
    } else {
      this.setState({
        expanded,
      });
    }
  }

  async updateGist(gistId) {
    const { updateGist } = this.props;
    updateGist(gistId);
    this.expandGists(false);
    toast.success(`Connected to ${gistId}`);
  }

  async createGist() {
    const { githubUserName } = this.props;
    try {
      const newGist = await this.gists.create({
        files: {
          'mdyna.json': {
            content: 'test',
          },
        },
        description: 'Mdyna Cards',
        public: false,
      });
      if (newGist) {
        const gistList = await this.gists.list(githubUserName);
        if (gistList) {
          const newGistIds = gistList.body.filter(
            gist => gist.description === 'Mdyna Cards',
          );
          this.updateGist(newGistIds && newGistIds[0].id);
        }
      }
    } catch (e) {
      toast.error('Could not create gist');
    }
  }

  render() {
    const {
      githubUserName,
      githubPassword,
      gistId,
      lastSyncDate,
      githubAuthOn,
      loadingGitHub,
      syncing,
      syncSuccess,
      badge,
      loginToGh,
      loginToGhSuccess,
      loginToGhFail,
    } = this.props;
    const {
      expanded, inputUsername, inputPw, gistList,
    } = this.state;
    return (
      <Box direction="row">
        <Collapsible className="sync" direction="horizontal" open={expanded}>
          {expanded && gistList && gistList.length ? (
            <Box>
              Select Gist
              {gistList.map(gist => (
                <Button onClick={() => this.updateGist(gist.id)} key={gist.url}>
                  {gist.description}
                </Button>
              ))}
              {<Button onClick={() => this.createGist()}>Create new</Button>}
            </Box>
          ) : (
            <React.Fragment>
              <TextInput
                label="Username"
                value={inputUsername}
                onChange={val => this.setState({ inputUsername: val })}
              />
              <TextInput
                label="Password"
                value={inputPw}
                type="password"
                onChange={val => this.setState({ inputPw: val })}
              />
              <Button onClick={() => this.authToGithub(inputUsername, inputPw)}>
                Login
              </Button>
            </React.Fragment>
          )}
        </Collapsible>
        <Button onClick={() => this.expandGists(!expanded)}>
          <Github />
          {gistId
            && githubUserName
            && `Connected to ${githubUserName}/${gistId}`}
        </Button>
      </Box>
    );
  }
}

GistSync.propTypes = {
  badge: PropTypes.bool,
  githubUserName: PropTypes.string.isRequired,
  githubPassword: PropTypes.string.isRequired,
  gistId: PropTypes.string.isRequired,
  lastSyncDate: PropTypes.string.isRequired,
  githubAuthOn: PropTypes.bool.isRequired,
  loadingGitHub: PropTypes.bool.isRequired,
  syncing: PropTypes.bool.isRequired,
  syncSuccess: PropTypes.bool.isRequired,
  loginToGh: PropTypes.func.isRequired,
  loginToGhSuccess: PropTypes.func.isRequired,
  loginToGhFail: PropTypes.func.isRequired,
  updateGist: PropTypes.func.isRequired,
};

GistSync.defaultProps = {
  badge: false,
};

export default GistSync;
