
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/footer.css'

class Footer extends React.Component {
   openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog");
    }

    render() {
        return (
            <>
                <div className="app__footer noselect">
                    <div onClick={this.openGithub} className="github__icon">
                        <GitHubIcon></GitHubIcon>
                    </div>
                </div>
            </>
        )
    }
}

export default Footer;