sh """
    ssh hkg3vl7874o.hk.hsbc '/opt/HZ/hazelcast/bin/hazelcast-version.sh' || echo 'Version check failed'
"""
println "Hazelcast version check completed."
