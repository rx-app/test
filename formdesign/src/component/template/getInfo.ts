export default function GetInfo<Action, DataType>(action: Action, data: DataType): void {
    console.log({action, data});
}
