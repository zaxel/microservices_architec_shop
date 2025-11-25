type MicroservicesTogglePropsType = {
    checked: boolean; 
    toggleChecked: (value: boolean) =>void
}
const MicroservicesToggle = ({checked, toggleChecked}: MicroservicesTogglePropsType) => {
    return (
        <div className="flex items-center gap-2 text-base text-gray-500">
            <input
                type="checkbox"
                className="w-4 h-4"
                checked={checked}
                onChange={(e) => toggleChecked(e.target.checked)}
            />
            Enable distributed systems
        </div>
    );
};

export default MicroservicesToggle;