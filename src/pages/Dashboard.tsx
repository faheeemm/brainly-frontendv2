import { useState } from "react";
import "../index.css"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar";

const Dashboard = () => {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>

      <Sidebar />
      
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        
        <div className="flex justify-end gap-4">
          <Button onClick={() => {
            setModalOpen(true)
          }} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
        </div>
  
        <div className="flex gap-4">
          <Card type="twitter" link="https://x.com/isha_singh06/status/2072674151731515495" title="first tweet" />
          <Card type="youtube" link="https://www.youtube.com/watch?v=uht0RPTt4w8" title="first video" />
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard