import { RadioGroup } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <button
            key={i.value}
            onClick={() => handleChange(i.value)}
            className={`w-full text-left text-sm py-2 px-3 rounded transition-colors ${
              i.value === value
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {i.label}
          </button>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
