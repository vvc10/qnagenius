import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { Button } from "@/app/components/ui/button"
import { Palette } from 'lucide-react';

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
];

const ColorPicker = ({ editor }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-10 gap-1">
          {COLORS.map((color) => (
            <button
              key={color}
              className="w-5 h-5 rounded hover:scale-110 transition-transform"
              style={{ backgroundColor: color, border: '1px solid #ddd' }}
              onClick={() => editor.chain().focus().setColor(color).run()}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;