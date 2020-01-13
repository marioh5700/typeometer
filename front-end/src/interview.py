def _traversal(node):
    validate_bst = True
    traversal(node)

    return validate_bst 

def traversal(node):
    if node.left != Null:
        if traversal(node.left) > node.value => validate_bst = False
    if node.right != Null:
        if traversal(node.right) < node.value => validate_bst = False

    return node.value