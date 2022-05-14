import * as React from "react"
import SidePanel from "./sidePanel"

const PageLayout = ({ location, title, children }) => {
    return (
        <div >
            <div class="flex flex-wrap">
                <div class="grow w-full p-6 lg:grow-0 lg:w-64">
                    <SidePanel />
                </div>
                <main class="grow max-w-3xl mx-auto px-6">{children}</main>
            </div>
        </div>
    )
}

export default PageLayout
