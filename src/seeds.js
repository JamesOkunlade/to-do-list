import Storage from "./storage"

const Seeds = (() => {
  const meta = () => {
    const data =
      [
       `{"id":1,"name":"How to create a Windows 10 DVD","tasks":[{"id":2,"name":"Step 1 - Download ImgBurn for free","desc":"Go to ImgBurn's website and click Download. Click the last Mirror link (Mirror 7 - Provided by ImgBurn - other download links are not safe), save the file to your hard disk and run it. Follow the steps to install the program, but make sure you deselect both the advertising add-ons the setup program tries to install (you'll need to select 'Custom Install (Advanced) to get rid of one of them).","dueDate":"2018-07-14T00:00:00.000Z","priority":2,"complete":false,"projectId":1},{"id":3,"name":"Step 2 - Write the ISO file to disc","desc":"Run ImgBurn, and click 'Write image file to disk'. Click the icon of a folder with a magnifying glass next to 'Source', and browse to the Windows 10 ISO you downloaded. Double-click the ISO file, put your blank DVD in the drive and click the large write icon at the bottom to make your DVD.","dueDate":"2018-07-14T00:20:00.000Z","priority":2,"complete":false,"projectId":1}]}`,
       `{"id":2,"name":"How to create a Windows 10 USB flash drive","tasks":[{"id":5,"name":"Step 2 - Write the ISO file to the flash drive","desc":"Under 'Partition scheme and target system type' select 'MBR partition scheme for BIOS or UEFI'. Under 'File system' select 'NTFS'. Check that 'Quick format', 'Create a bootable disk using' and 'Create extended label and icon files' are selected, make sure 'ISO image' is selected in the drop-down next to 'Create a bootable disk using' and click the small icon that looks like a DVD drive with a disc above it. Browse to your ISO and double-click to select it, then click Start.","dueDate":"2018-07-14T01:00:00.000Z","priority":2,"complete":false,"projectId":2},{"id":4,"name":"Step 1 - Download Rufus for free","desc":"Go to rufus.akeo.ie, and download the latest version (2.12 at the time of writing). Save it to your computer and run it. Plug in your flash drive, and it will appear at the top under Device. Rufus will show the USB stick's drive letter in brackets after the flash drive's name. Check in Computer/This PC that this is definitely the drive you want to use for your Windows 10 installer disk as remember that it will be entirely and irretrievably wiped during the installation process. ","dueDate":"2018-07-14T00:30:00.000Z","priority":2,"complete":false,"projectId":2}]}`,
       `{"id":4,"name":"How to install Windows 10","tasks":[{"id":10,"name":"Step 5 - Select your hard disk or SSD","desc":"","dueDate":"2018-07-14T03:40:00.000Z","priority":2,"complete":false,"projectId":4},{"id":9,"name":"Step 4 - How to find your Windows 10 license key","desc":"At this point you'll be asked for your licence key. What you put it, depends on the type of Windows 10 that you have, but we'll explain how to deal with everything here.","dueDate":"2018-07-14T02:40:00.000Z","priority":2,"complete":false,"projectId":4},{"id":8,"name":"Step 3 - Choose the Windows 10 clean install option","desc":"Once you're in the Setup program, select your language, time and currency format and input method, and click Next. Click the Install Now button. Enter your Windows key if prompted, and read and accept the software licence. In the next screen, select 'Custom: Install Windows only (advanced)'.","dueDate":"2018-07-14T02:20:00.000Z","priority":2,"complete":false,"projectId":4},{"id":7,"name":"Step 2 - Set your computer to boot from DVD or USB","desc":"Once in Setup, find the Boot section. Now change the boot order to put the device you want to boot from first; this will be DVD or USB, depending on your installation media type. Bootable USB flash drives are sometimes listed as hard disks. If this is the case you'll need to set 'hard disk' as the first boot option, then go into the hard disk boot order sub-menu and put your USB boot disk at the top of the list. Find and select the Save and Restart option or equivalent.","dueDate":"2018-07-14T01:20:00.000Z","priority":2,"complete":true,"projectId":4},{"id":6,"name":"Step 1 - Enter your computer's BIOS","desc":"You first need to make sure your computer is set to boot from your DVD drive or from USB. Insert your DVD or USB installation disk and restart your PC. You may find that your PC has a special boot override menu, which you can access with a key such as F10; look out for the message while your computer starts. If this is the case, press the key as soon as the message is displayed, then select your DVD drive or USB stick to boot.","dueDate":"2018-07-14T01:10:00.000Z","priority":2,"complete":true,"projectId":4}]}`
      ]

    const projects = data.map(m => JSON.parse(m))
    projects.forEach(p => Storage.save(p))

    const meta = projects.map(p => { return { id: p.id, name: p.name } })
    Storage.saveMeta(meta)
    return meta
  }

  const projectId = () => {
    return 5
  }

  const taskId = () => {
    return 11
  }

  return { meta, projectId, taskId }
})()

export default Seeds
