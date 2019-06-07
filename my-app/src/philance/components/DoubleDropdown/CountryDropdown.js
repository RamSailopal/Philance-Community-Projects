import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { countryOptions } from './common'

export default class CountryDropdown extends React.Component {
    state = {
        value: this.props.defaultValue
    }

    render() {
        var check = this.props.action
        return (
            <Dropdown
                placeholder='Select Country'
                fluid
                error={check}
                search
                selection
                disabled={this.props.disabled}
                options={countryOptions}
                value={this.props.defaultValue}
                onChange={async (e, { value }) => {
                    this.setState({ value })
                    this.props.onCountryChanged(value)
                }
                }
            />
        )
    }
}