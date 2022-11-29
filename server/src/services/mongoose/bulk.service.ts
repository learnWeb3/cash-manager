export default {

    incrementAllFieldsValue: (filter: Object, update: Object, arrayFilters: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $inc: update
                },
                arrayFilters: arrayFilters
            }
        }
    },

    incrementField: (filter: Object, update: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $inc: update
                }
            }
        }
    },

    setAllObjectInArray: (filter: Object, update: Object, arrayFilters: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $set: update
                },
                arrayFilters: arrayFilters
            }
        }
    },

    setField: (filter: Object, update: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $set: update
                }
            }
        }
    },

    pullInArray: (filter: Object, update: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $pull: update
                }
            }
        }
    },

    pushInArray: (filter: Object, update: Object) => {
        return {
            updateMany: {
                filter: filter,
                update: {
                    $push: update
                }
            }
        }
    },

    deleteAllDocuments: (filter: Object) => {
        return {
            deleteMany: {
                filter: filter
            }
        }
    }

}