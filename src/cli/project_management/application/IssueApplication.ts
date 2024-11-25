
import { isAtomicUserStory, isBacklog,  isEpic, isTaskBacklog, Model } from "../../../language/generated/ast.js";
import { AbstractApplication } from "./AbstractApplication.js";
export  class IssueApplication extends AbstractApplication {

    constructor(target_folder:string, model: Model) {

        super(target_folder, model)       
        this.jsonFile = "issue.json"
    }

    public async create(){
        const epcis = this.model.components.filter(isBacklog).flatMap(backlog => backlog.items.filter(isEpic));
        const atomicUserStories = this.model.components.filter(isBacklog).flatMap(backlog => backlog.items.filter(isAtomicUserStory));
        const tasks = this.model.components.filter(isBacklog).flatMap(backlog => backlog.items.filter(isTaskBacklog));
        
        
        epcis.map (async value => {
            await this.createAndSave(value.$container.id.toLocaleLowerCase(), value)
        })

        atomicUserStories.map (async value => {
            await this.createAndSave(value.$container.id.toLocaleLowerCase(),value)
        })

        tasks.map (async value => {
            await this.createAndSave(value.$container.id.toLocaleLowerCase(),value)
        })

        

    }

    

    

       
}