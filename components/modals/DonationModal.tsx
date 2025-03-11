
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view";
  donation?: any;
}

const DonationModal = ({ isOpen, onClose, mode, donation }: DonationModalProps) => {
  const { toast } = useToast();
  const isViewMode = mode === "view";
  
  const [formData, setFormData] = useState({
    title: donation?.title || "",
    category: donation?.category || "",
    condition: donation?.condition || "Good",
    description: donation?.description || "",
    pickupAddress: donation?.pickupAddress || "",
    pickupDate: donation?.pickupDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isViewMode) return;
    
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    if (isViewMode) return;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    if (isViewMode) {
      onClose();
      return;
    }
    
    // Validate form
    if (!formData.title || !formData.category || !formData.condition) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would create the donation in the database
    console.log("Creating donation:", formData);
    
    toast({
      title: "Donation Submitted",
      description: "Your donation has been submitted for review",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode ? "Donation Details" : "Create Donation"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Item Name <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Item name"
                readOnly={isViewMode}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
                disabled={isViewMode}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jacket">Jacket</SelectItem>
                  <SelectItem value="Sweater">Sweater</SelectItem>
                  <SelectItem value="Dress">Dress</SelectItem>
                  <SelectItem value="Shirt">Shirt</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Coat">Coat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.condition} 
              onValueChange={(value) => handleSelectChange("condition", value)}
              disabled={isViewMode}
            >
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New (with tags)</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Item description"
              rows={4}
              readOnly={isViewMode}
            />
          </div>
          
          {!isViewMode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Input
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Address for item pickup"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Item Photos</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop images or click to browse
                  </p>
                </div>
              </div>
            </>
          )}
          
          {isViewMode && donation?.status && (
            <div className="mt-2 p-3 bg-muted rounded-md">
              <p className="font-medium">Status: {donation.status}</p>
              {donation.statusDate && (
                <p className="text-sm text-muted-foreground">Updated: {donation.statusDate}</p>
              )}
              {donation.notes && (
                <div className="mt-2">
                  <p className="font-medium">Admin Notes:</p>
                  <p className="text-sm">{donation.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
          {!isViewMode && (
            <Button onClick={handleSubmit}>Submit Donation</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
