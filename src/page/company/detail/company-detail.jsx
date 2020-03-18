import React from 'react';
import CompanyDetail from 'components/CompanyDetail/detail';
import * as HTTP from 'units/Axios';

class CompanyAllDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModule: [],
            queryHttpUrl: HTTP.companyQuery,
            updateHttpUrl: HTTP.companyUpdate,
            id: Number(this.props.match.params['id']) ? Number(this.props.match.params['id']) : -1,
            ifShow: this.props.match.params['ifShow'] ? this.props.match.params['ifShow'] : '0'
        }
    }

    componentDidMount() { //预加载数据
        console.log('props:',this.props.match.params)
    }
    handleFormBack = (e) => {
        sessionStorage.setItem('_ifBack','0');
        this.props.history.go(-1);
    }

    render() {
        const { showModule, updateHttpUrl, queryHttpUrl, ifShow, id } = this.state;
        return (
            <CompanyDetail ifAll={true} showModule={showModule} updateHttpUrl={updateHttpUrl} handleFormBack={this.handleFormBack} ifShow={ifShow} id={id} queryHttpUrl={queryHttpUrl}/>
        )
    }
}

export default CompanyAllDetail
