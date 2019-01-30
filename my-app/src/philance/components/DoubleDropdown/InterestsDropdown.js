import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class InterestsDropdown extends React.Component {

    render() {
        let check = this.props.action
        return (
            <Dropdown
                placeholder='Select Interests'
                fluid
                selection
                multiple
                error={check}
                disabled={this.props.disabled}
                options={this.props.interestOptions}
                value={this.props.defaultValue==null?[]:this.props.defaultValue}
                onChange={this.props.onInterestsChange}
            />
        )
    }
}

export default InterestsDropdown
