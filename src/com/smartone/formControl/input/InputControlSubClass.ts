/**
* com/smartone/formControl/input/InputControlSubClass
**/
import { InputControlProps } from "./InputControl";


export interface InputControlSubClassProps<T> extends InputControlProps<T> {
	// inputProps is optional, exclude undefined for the type 
	// Exclude<InputControlProps["inputProps"], undefined>
	inputProps?: Omit<Exclude<InputControlProps<T>["inputProps"], undefined>, "type">;
}