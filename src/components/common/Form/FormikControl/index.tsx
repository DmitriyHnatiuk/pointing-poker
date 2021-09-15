import React from 'react';
import {
	InterfaceFormikControl,
	InterfaceOptions,
	TypeInputFormikControl
} from 'interfaces/commonForm';

import InputFormik from 'components/common/Form/FormikInput';
import SelectFormik from 'components/common/Form/FormikSelect';
import ImagesFormik from 'components/common/Form/ImagesFormik';
import FormikSwitch from 'components/common/Form/FormikSwitch';

const FormikControl: React.FC<InterfaceFormikControl> = (props) => {
	const { control, data, ...rest } = props;
	switch (control) {
		case TypeInputFormikControl.input:
			return <InputFormik {...rest} />;
		case TypeInputFormikControl.select:
			return (
				<SelectFormik options={[...(data as InterfaceOptions[])]} {...rest} />
			);
		case TypeInputFormikControl.image:
			return <ImagesFormik {...rest} />;
		case TypeInputFormikControl.switch:
			return <FormikSwitch {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
